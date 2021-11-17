/* External dependencies */
import React from 'react';
import { NextPage } from 'next';

/* Internal dependencies */
import Layout from 'components/Layout';
import TermsTemplate from 'components/templates/Terms';

const Terms: NextPage = () => {
  return (
    <Layout>
      <TermsTemplate />
    </Layout>
  );
};

export default Terms;
