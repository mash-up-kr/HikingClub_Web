/* External dependencies */
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import { noop } from 'lodash';

/* Internal dependencies */
import OverlayPosition from './OverlayPosition';
import { Container, Wrapper, StyledOverlay } from './Overlay.styled';

interface OverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  show?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string;
  containerStyle?: React.CSSProperties;
  container?: HTMLElement | null;
  target: HTMLElement | null;
  placement?: OverlayPosition;
  keepInContainer?: boolean;
  transition?: boolean;
  marginX?: number;
  marginY?: number;
  children: React.ReactNode;
  onHide?: () => void;
}

interface ContainerRectAttr {
  containerWidth: number;
  containerHeight: number;
  containerTop: number;
  containerLeft: number;
  scrollTop: number;
  scrollLeft: number;
}

interface TargretRectAttr {
  targetWidth: number;
  targetHeight: number;
  targetTop: number;
  targetLeft: number;
  clientTop: number;
  clientLeft: number;
}

interface GetOverlayStyleProps {
  containerRect: ContainerRectAttr | null;
  targetRect: TargretRectAttr | null;
  overlay: HTMLElement;
  placement: OverlayPosition;
  marginX: number;
  marginY: number;
  keepInContainer: boolean;
}

interface GetOverlayPositionProps {
  containerRect: ContainerRectAttr;
  targetRect: TargretRectAttr | null;
}

interface GetOverlayTranslationProps {
  containerRect: ContainerRectAttr;
  targetRect: TargretRectAttr | null;
  overlay: HTMLElement;
  placement: OverlayPosition;
  marginX: number;
  marginY: number;
  keepInContainer: boolean;
}

type EventHandler<K extends keyof HTMLElementEventMap> = (
  event: HTMLElementEventMap[K]
) => any;

const ESCAPE_KEY = 'Escape';
const rootElement =
  document.getElementById('root') ||
  document.getElementById('__next') ||
  (document.getElementsByTagName('body')[0] as HTMLElement);

function listen<K extends keyof HTMLElementEventMap>(
  element: any,
  eventName: K,
  handler: EventHandler<K>,
  useCapture = false
) {
  if (!element) return noop;

  element.addEventListener(eventName, handler, useCapture);
  return function cleanup() {
    element.removeEventListener(eventName, handler, useCapture);
  };
}

function getOverlayPosition({
  containerRect,
  targetRect,
}: GetOverlayPositionProps): React.CSSProperties {
  if (containerRect && targetRect) {
    const { containerTop, containerLeft, scrollTop, scrollLeft } =
      containerRect;
    const { targetTop, targetLeft, clientTop, clientLeft } = targetRect;

    const top = targetTop - clientTop - containerTop + scrollTop;
    const left = targetLeft - clientLeft - containerLeft + scrollLeft;

    return { top, left };
  }
  return {};
}

function getOverlayTranslation({
  containerRect,
  targetRect,
  overlay,
  placement,
  marginX,
  marginY,
  keepInContainer,
}: GetOverlayTranslationProps): React.CSSProperties {
  if (containerRect && targetRect) {
    const { containerWidth, containerHeight, containerTop, containerLeft } =
      containerRect;
    const { targetWidth, targetHeight, targetTop, targetLeft } = targetRect;
    const { width: overlayWidth, height: overlayHeight } =
      overlay.getBoundingClientRect();

    let translateX = 0;
    let translateY = 0;

    // pre position
    switch (placement) {
      case OverlayPosition.TopCenter:
      case OverlayPosition.TopLeft:
      case OverlayPosition.TopRight:
        translateY -= overlayHeight + marginY;
        translateX += marginX;
        break;
      case OverlayPosition.RightCenter:
      case OverlayPosition.RightTop:
      case OverlayPosition.RightBottom:
        translateX += targetWidth + marginX;
        translateY += marginY;
        break;
      case OverlayPosition.LeftCenter:
      case OverlayPosition.LeftTop:
      case OverlayPosition.LeftBottom:
        translateX -= overlayWidth + marginX;
        translateY += marginY;
        break;
      case OverlayPosition.BottomCenter:
      case OverlayPosition.BottomLeft:
      case OverlayPosition.BottomRight:
      default:
        translateY += targetHeight + marginY;
        translateX += marginX;
        break;
    }
    // post position
    switch (placement) {
      case OverlayPosition.TopRight:
      case OverlayPosition.BottomRight:
        translateX -= overlayWidth - targetWidth;
        break;
      case OverlayPosition.RightCenter:
      case OverlayPosition.LeftCenter:
        translateY -= overlayHeight / 2 - targetHeight / 2;
        break;
      case OverlayPosition.RightBottom:
      case OverlayPosition.LeftBottom:
        translateY -= overlayHeight - targetHeight;
        break;
      case OverlayPosition.TopCenter:
      case OverlayPosition.BottomCenter:
      default:
        translateX -= overlayWidth / 2 - targetWidth / 2;
        break;
    }

    if (keepInContainer) {
      const isOverTop = targetTop + translateY < containerTop;
      const isOverBottom =
        targetTop + translateY + overlayHeight > containerTop + containerHeight;
      const isOverLeft = targetLeft + translateX < containerLeft;
      const isOverRight =
        targetLeft + translateX + overlayWidth > containerLeft + containerWidth;

      if (isOverTop || isOverBottom) {
        translateY = targetHeight - translateY - overlayHeight;
      }
      if (isOverLeft || isOverRight) {
        translateX = targetWidth - translateX - overlayWidth;
      }
    }

    const transform = `translate(${translateX}px, ${translateY}px)`;
    return { transform };
  }
  return {};
}

function getOverlayStyle({
  containerRect,
  targetRect,
  overlay,
  placement,
  marginX,
  marginY,
  keepInContainer,
}: GetOverlayStyleProps): React.CSSProperties {
  if (containerRect && targetRect) {
    const overlayPositionStyle = getOverlayPosition({
      containerRect,
      targetRect,
    });
    const overlayTranslateStyle = getOverlayTranslation({
      containerRect,
      targetRect,
      overlay,
      placement,
      marginX,
      marginY,
      keepInContainer,
    });

    const combinedStyle = {
      ...overlayPositionStyle,
      ...overlayTranslateStyle,
      willChange: 'left, top',
    };

    return combinedStyle;
  }
  return {};
}

function Overlay({
  show = false,
  className = '',
  style,
  containerClassName = '',
  containerStyle,
  container,
  target,
  placement = OverlayPosition.LeftCenter,
  marginX = 0,
  marginY = 0,
  keepInContainer = false,
  transition = false,
  children,
  onHide = noop,
  ...otherProps
}: OverlayProps) {
  const [overlayStyle, setOverlayStyle] = useState<React.CSSProperties>();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlockMouseWheel = useCallback(
    (event: HTMLElementEventMap['wheel']) => {
      event.stopPropagation();
    },
    []
  );

  const handleHideOverlay = useCallback(
    (event: any) => {
      if (!event.target?.closest(StyledOverlay)) {
        onHide();
        event.stopPropagation();
      }
    },
    [onHide]
  );

  const handleKeydown = useCallback(
    (event: HTMLElementEventMap['keyup']) => {
      if (event.key === ESCAPE_KEY) {
        onHide();
      }
    },
    [onHide]
  );

  const overlay = useMemo(() => {
    if (container) {
      return (
        <StyledOverlay
          className={className}
          isHidden={isHidden}
          transition={transition}
          style={{
            ...(style || {}),
            ...(overlayStyle || {}),
          }}
          ref={overlayRef}
          {...otherProps}
        >
          {children}
        </StyledOverlay>
      );
    }
    return (
      <Container
        ref={containerRef}
        className={containerClassName}
        style={containerStyle}
      >
        <Wrapper>
          <StyledOverlay
            className={className}
            isHidden={isHidden}
            transition={transition}
            style={{
              ...(style || {}),
              ...(overlayStyle || {}),
            }}
            ref={overlayRef}
            {...otherProps}
          >
            {children}
          </StyledOverlay>
        </Wrapper>
      </Container>
    );
  }, [
    className,
    style,
    containerClassName,
    containerStyle,
    container,
    isHidden,
    transition,
    overlayStyle,
    children,
    overlayRef,
    otherProps,
  ]);

  const containerRect = useMemo(() => {
    if (!show) {
      return null;
    }

    const containerElement = container || (rootElement as HTMLElement);
    const {
      width: containerWidth,
      height: containerHeight,
      top: containerTop,
      left: containerLeft,
    } = containerElement.getBoundingClientRect();

    return {
      containerWidth,
      containerHeight,
      containerTop,
      containerLeft,
      scrollTop: container ? container.scrollTop : 0,
      scrollLeft: container ? container.scrollLeft : 0,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, container, children]);

  const targetRect = useMemo(() => {
    if (!target || !show) {
      return null;
    }

    const {
      width: targetWidth,
      height: targetHeight,
      top: targetTop,
      left: targetLeft,
    } = target.getBoundingClientRect();
    const { clientTop, clientLeft } = target;

    return {
      targetWidth,
      targetHeight,
      targetTop,
      targetLeft,
      clientTop,
      clientLeft,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show, target, children]);

  useEffect(() => {
    if (show) {
      const removeDocumentClickListener = listen(
        document,
        'click',
        handleHideOverlay,
        true
      );
      const removeDocumentKeyupListener = listen(
        document,
        'keyup',
        handleKeydown
      );
      const remoteContainerWheelListener = listen(
        containerRef.current,
        'wheel',
        handleBlockMouseWheel
      );

      return () => {
        removeDocumentClickListener();
        removeDocumentKeyupListener();
        remoteContainerWheelListener();
      };
    }
    return noop;
  }, [show, target, handleHideOverlay, handleKeydown, handleBlockMouseWheel]);

  useEffect(() => {
    if (show) {
      const tempOverlayStyle = getOverlayStyle({
        containerRect,
        targetRect,
        overlay: overlayRef.current as HTMLElement,
        placement,
        marginX,
        marginY,
        keepInContainer,
      });
      setOverlayStyle(tempOverlayStyle);
      setIsHidden(false);

      return () => {
        setOverlayStyle(undefined);
        setIsHidden(true);
      };
    }
    return noop;
  }, [
    show,
    containerRect,
    targetRect,
    marginX,
    marginY,
    placement,
    keepInContainer,
  ]);

  if (!show) return null;

  return ReactDOM.createPortal(
    overlay,
    container || (rootElement as HTMLElement)
  );
}

export default Overlay;
