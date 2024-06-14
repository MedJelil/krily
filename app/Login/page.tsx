"use client";
import React from "react";
import styles from "../styles/styles.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions";
import { ArrowRightIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Login = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <div className={styles.container}>
      <div className={`max-w-lg w-full`}>
        <div
          className={`bg-gray-800 rounded-lg shadow-xl overflow-hidden ${styles.box}`}
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-white">
              Bienvenue
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Connecter-vous Pour Continuer
            </p>
            <form action={dispatch} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Numero du telephone
                  </label>
                  <input
                    placeholder="Numero Du Telephone"
                    className={`appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${styles.inputNumber}`}
                    type="number"
                    name="phoneNumber"
                    id="telephone"
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Mot de pass
                  </label>
                  <input
                    placeholder="Mot De Pass"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    type="password"
                    name="password"
                    id="password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="text-sm">
                  <a
                    className="font-medium text-indigo-500 hover:text-indigo-400"
                    href="#"
                  >
                    Mot de pass oublié?
                  </a>
                </div>
              </div>

              <div>
                <LoginButton />
              </div>
              {errorMessage && (
                <>
                  {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Je n'ai pas de compte?</span>
            <Link
              className="font-medium text-indigo-500 hover:text-indigo-400"
              href="/Signup"
            >
              Enregistrer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      aria-disabled={pending}
    >
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </button>
  );
}
