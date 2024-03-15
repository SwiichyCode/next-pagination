import { Post } from "@prisma/client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const PostCard = (props: Post) => {
  const { name } = props;

  return (
    <Card>
      <CardHeader>Post</CardHeader>
      <CardContent>{name}</CardContent>
    </Card>
  );
};
