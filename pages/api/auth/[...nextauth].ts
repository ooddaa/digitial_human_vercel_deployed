// https://next-auth.js.org/configuration/providers/credentials
// https://next-auth.js.org/providers/credentials
import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials"

const providers = [
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    // You can pass any HTML attribute to the <input> tag through the object.
    credentials: {
      username: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      // const { csrfToken, username, password } = credentials // same as req.body

      // You need to provide your own logic here that takes the credentials
      // submitted and returns either a object representing a user or value
      // that is false/null if the credentials are invalid.
      // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
      // You can also use the `req` object to obtain additional parameters
      // (i.e., the request IP address)
      // const res = await fetch("/your/endpoint", {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      //   headers: { "Content-Type": "application/json" }
      // })
      // const user = await res.json()

      /* hardcode */
      const res = { ok: true };
      const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

      // If no error and we have user data, return it
      if (res.ok && user) {
        return user
      }
      // Return null if user data could not be retrieved
      return null
    }
  })
]

/**
 * @todo MOVE TO ENV VAR  WHEN IN PRODUCTION!
 * 
 * run in terminal
 * $ openssl rand -base64 32
 * to generate a secret
 * 
 * https://next-auth.js.org/configuration/options#secret
 */
const secret = "AL+RD+WZwDlLQn14EZz3OMdS/IeCnEwbslKcOdfaxDU="

export default NextAuth({ providers, secret })

