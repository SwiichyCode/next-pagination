import { Posts } from "@/components/Posts";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export default async function HomePage(props: PageProps) {
  return <Posts {...props} />;
}
