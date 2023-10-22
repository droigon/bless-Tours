import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const OPTIONS: any = { 
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID as string,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
      },
      //   async authorize(credentials) {
      //     // This is where you need to retrieve user data
      //     // to verify with credentials
      //     // Docs: https://next-auth.js.org/configuration/providers/credentials
      //     const user = {
      //       id: "42",
      //       email: "kiran714@gmail.com",
      //       name: "Kiran Palpali",
      //       password: "kiran123",
      //       image:
      //         "https://images.unsplash.com/photo-1605640840605-14ac1855827b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1033&q=80",
      //     };

      //     if (
      //       credentials?.email === user.email &&
      //       credentials?.password === user.password
      //     ) {
      //       return user;
      //     } else {
      //       return null;
      //     }
      //   },
      async authorize(credentials: any, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log("credentials", credentials);
        const { role, email, password } = credentials;
        const roleParam = role !== "null" ? `${role}` : "users";
        //const api = `http://0.0.0.0.:3000/api/v1/${roleParam}/signin`;
        const api = `https://blesstours.onrender.com/api/v1/${roleParam}/signin`;

        const res = await fetch(api, {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        console.log("user", user);

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user.data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }: any) {
      if (user) {
        token = {
          // ...token,
          // id: user.id,
          // authToken: user.token,
          // email: user.EMAIL,
          // picture: user.ROLE === "USER" ? user.PROFILE_PICTURE : user.PROFILE,
          ...token,
          ...user,
        };

        //console.log("route", token)

        // if (user.ROLE === "USER") {
        //   token.role = user.ROLE;
        //   token.firstname = user.FIRSTNAME;
        //   token.lastname = user.LASTNAME;
        // } else if (!user.ROLE) {
        //   token.name = user.NAME;
        // }
      }
      //console.log("token", token);

      return token;
    },

    

    // If you want to use the role in client components
    async session({ session, token }: any) {
      if (session?.user) {
        session.user = { ...token };
      }
      if (session?.vendor) {
        session.vendor = { ...token };
      }
      if (session?.admin) {
        session.vendor = { ...token };
      }

      session.user = token;

      return session;
    },
  },
};

const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
