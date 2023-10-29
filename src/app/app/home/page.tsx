import Link from "next/link";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";
import * as Icons from "./_Icons";

const HomeTile = ({
  href,
  icon,
  title,
  isDisabled,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  isDisabled?: boolean;
}) => (
  <Link
    href={!isDisabled ? href : "#"}
    aria-disabled={isDisabled}
    className="flex aspect-square w-full max-w-[130px] flex-col items-center justify-center space-y-3 self-center rounded-lg bg-primary text-primary-foreground aria-disabled:opacity-70"
  >
    {icon}
    <p className="text-center text-sm font-bold">{title}</p>
  </Link>
);

export default async function HomePage() {
  const session = await getServerAuthSession();
  if (!session) redirect("/app?screen=login");

  return (
    <div className="flex min-h-screen flex-col pt-8">
      <div className="container mx-auto flex-1">
        <div>
          <div className="grid grid-cols-[1fr,auto]">
            <h1 className="text-3xl font-extrabold">How can I help you?</h1>
            <Avatar className="h-10 w-10">
              <AvatarImage src={session.user.image ?? ""} />
              <AvatarFallback>{session.user.name?.slice(0, 2)}</AvatarFallback>
            </Avatar>
          </div>
          <h3 className="mt-4">
            An app that helps you with German Bureaucracy. For more social
            sustainability.
          </h3>
        </div>
        <div className="mt-12 grid flex-1 grid-cols-2 justify-items-center gap-x-8 gap-y-4">
          <HomeTile
            href="/app/residence-permit"
            icon={<Icons.PermitIcon width={48} height={48} />}
            title="Apply for residence permit"
          />
          <HomeTile
            href="/"
            icon={<Icons.SuitcaseIcon width={48} height={48} />}
            title="Apply for a work permit"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.MoneyIcon width={48} height={48} />}
            title="Find a job"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.HouseIcon width={48} height={48} />}
            title="Find a residence"
            isDisabled
          />
          <HomeTile
            href="/"
            icon={<Icons.BuddyIcon width={48} height={48} />}
            title="Find a buddy"
            isDisabled
          />
        </div>
      </div>
      <div className="h-20 w-screen bg-primary" />
    </div>
  );
}
