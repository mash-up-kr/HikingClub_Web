/* External dependencies */
import { useState, useEffect } from 'react';

function useMounted() {
  const [isMounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return isMounted;
}

export default useMounted;
