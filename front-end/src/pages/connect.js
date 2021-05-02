import * as React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import MailchimpInput from "../components/MailchimpInput"

/**
 * HTML
 */
const Index = () => {
  return (
    <>
      <Helmet>
        <title>Marcaz</title>
      </Helmet>
      <Layout onConnect = {true} routeText = "BACK" route = "">
        <MailchimpInput />
      </Layout>
    </>
  )
}

export default Index
