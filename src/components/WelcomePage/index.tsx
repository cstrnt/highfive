"use client";

import Image from "next/image";
import hiringImage from "./hiring.png";
import { Button } from "~/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import * as SocialLogos from "~/components/SocialLogos";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { Input } from "../ui/input";
import Link from "next/link";

export type ScreenType = "welcome" | "language" | "login";

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <Image
        src={hiringImage}
        alt="hiring new people"
        quality={100}
        className="w-6/12"
      />
      <h1 className="text-4xl font-bold">Who are you?</h1>
      <svg
        width="250"
        height="8"
        viewBox="0 0 250 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-2"
      >
        <path
          d="M1.99997 4.62713C48.7742 2.30373 163.417 -0.600504 247.794 6.36967"
          stroke="#EDA840"
          stroke-width="3.27725"
          stroke-linecap="round"
        />
      </svg>
      <p className="mb-12 mt-4 max-w-xs">
        An app that helps you with German Bureaucracy. For more social
        sustainability.
      </p>
      <div className="flex w-full flex-col space-y-6">
        <Button size="app" onClick={onNext}>
          Foreigner
        </Button>
        <Button size="app" disabled>
          Helper
        </Button>
        <Button size="app" disabled>
          Business Owner
        </Button>
      </div>
    </>
  );
};

const LanguageScreen = ({ onNext }: { onNext: () => void }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<
    string | undefined
  >();

  return (
    <>
      <h1 className="text-2xl font-medium">Select your language</h1>
      <h3>
        Please select your language. This will be used to translate the app for
        you.
      </h3>
      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger className="my-11 w-[310px] rounded-2xl border-primary py-8 shadow-xl">
          <SelectValue placeholder="Select your language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="english">English</SelectItem>
          <SelectItem value="german">German</SelectItem>
          <SelectItem value="arabic">Arabic</SelectItem>
        </SelectContent>
      </Select>
      <Button
        size="app"
        className="w-full"
        disabled={!selectedLanguage}
        onClick={onNext}
      >
        Confirm Language
      </Button>
    </>
  );
};

const LoginScreen = () => (
  <>
    <Image
      src="/hand-logo.png"
      alt="hand-logo"
      width={99}
      height={102}
      quality={100}
      className="mb-8"
    />
    <h1 className="text-2xl font-semibold">Getting started</h1>
    <h3 className="mt-4 text-muted-foreground">
      Create an account to continue
    </h3>

    <form className="mt-8 w-full space-y-3">
      <Input
        placeholder="Email"
        type="email"
        className="min-h-[50px] border-transparent bg-[#F5F5F5]"
        disabled
      />
      <Input
        placeholder="Password"
        className="min-h-[50px] border-transparent bg-[#F5F5F5]"
        disabled
      />
      <Button type="submit" size="app" className="!mt-8 w-full" disabled>
        Create Account
      </Button>
    </form>

    <p className="my-7">
      Already have an account?{" "}
      <Link href="/app" className="text-blue-500">
        Sign in
      </Link>
    </p>

    <div className="relative w-full">
      <div className="absolute inset-0 flex items-center">
        <span className="w-full border-t"></span>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
    </div>
    <div className="mt-7 grid w-full grid-cols-3 gap-4">
      <Button variant="ghost" className="h-[70px] shadow-xl" disabled>
        <SocialLogos.FacebookLogo className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        className="h-[70px] shadow-xl"
        onClick={() =>
          signIn("google", {
            callbackUrl: "/app/home",
          })
        }
      >
        <SocialLogos.GoogleLogo className="h-6 w-6" />
      </Button>
      <Button variant="ghost" className="h-[70px] shadow-xl" disabled>
        <SocialLogos.AppleLogo className="h-6 w-6" />
      </Button>
    </div>
  </>
);

export default function WelcomePage({
  currentPage,
}: {
  currentPage: ScreenType;
}) {
  const router = useRouter();

  const onBackPage = () => {
    const currentUrl = new URL(window.location.href);
    if (currentPage === "language") {
      currentUrl.searchParams.set("screen", "welcome");
    } else if (currentPage === "login") {
      currentUrl.searchParams.set("screen", "language");
    }
    router.push(currentUrl.toString());
  };

  const onNext = (nextScreen: ScreenType) => {
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("screen", nextScreen);
    router.push(currentUrl.toString());
  };

  const canBack = currentPage !== "welcome";

  return (
    <div className="relative flex flex-col items-center text-center">
      <nav className="absolute flex w-full items-center justify-between">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBackPage}
          data-visible={canBack}
          className="opacity-0 transition duration-200 ease-out data-[visible=true]:opacity-100"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </nav>

      {currentPage === "welcome" && (
        <WelcomeScreen onNext={() => onNext("language")} />
      )}
      {currentPage === "language" && (
        <LanguageScreen onNext={() => onNext("login")} />
      )}
      {currentPage === "login" && <LoginScreen />}
    </div>
  );
}
