import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import loadFirebase from "../lib/db";

export default function Home() {
  // const [show, setShow] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [mail, setMail] = useState("");

  const userId = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  };

  const handleSubmit = async (e) => {
    const firebase = await loadFirebase();
    const userListRef = firebase.database().ref("users/");
    let newUserRef = userListRef.push();
    newUserRef.set(
      {
        mail: mail,
      },
      (e) => {
        if (e) {
          alert(`Unable to Submit ${mail}. ERR: ${e}`);
        } else {
          console.log(`Mail ID is ${mail}`);
          setSubmit(true);
        }
      }
    );
  };

  return (
    <div className="h-full w-full">
      <Head>
        <title>Retire Young</title>
        <meta
          name="description"
          content="Why wait till your old age, plan your retirement and retire early."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative z-10 center-elements text-black">
        <div className="m-auto h-screen flex center-elements">
          <h1 className="text-shadow text-center text-5xl font-extrabold px-6 pt-6">
            💸 Retiral 💸
          </h1>
          <h3 className="text-shadow text-center text-2xl font-normal text-gray-500 p-6">
            Financial tools specifically designed for people who are planning to
            retire young.
          </h3>
          {(!submit && (
            <div className="center-elements px-2 py-4 w-auto">
              <label
                htmlFor="mail"
                className="text-lg text-gray-600 text-center mb-2"
              >
                Get a mail when the product launches.
              </label>
              <input
                className="input-custom"
                type="email"
                name="mail"
                placeholder="something@sample.com"
                pattern="[^ @]*@[^ @]*"
                onChange={(e) => setMail(e.currentTarget.value)}
              ></input>
              <button
                className="btn-custom bg-white shadow-xl text-lg disabled:opacity-50"
                onClick={handleSubmit}
                disabled={mail === "" ? true : false}
              >
                Keep me informed 👉
              </button>
            </div>
          )) ||
            (submit && (
              <div className="center-elements px-2 py-4 w-auto">
                <h1>Thanks for joining our Waitlist, 🙏</h1>
                <h1>here's some sample for you. 😇</h1>
                <Link href="/plan">
                  <button className="btn-custom">Plan 📈 👉</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

/**
 * font-size: 4rem;
    font-weight: 600;
    padding: 2rem;
    padding-bottom: 22rem;
    line-height: 0.9;
    color: white;
    text-shadow: 2px 2px 6px #404040;
 */
