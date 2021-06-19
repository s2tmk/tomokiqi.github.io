import { useCallback } from "react";
import { InferGetStaticPropsType, GetStaticPropsContext } from "next";
import { IBlog, IBlogList } from "interfaces/blog";
import { Container } from "components/Container";
import { VStack, Flex, Heading, Image as ChakraImage } from "@chakra-ui/react";
import { ButtonParts } from "components/parts/ButtonParts";
import { useRouter } from "next/router";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Blog: React.VFC<Props> = ({ blog }) => {
  const router = useRouter();
  const routerBack = useCallback(() => router.back(), []);

  return (
    <Container>
      <VStack
        width="70%"
        spacing="2rem"
        justifyContent="center"
        alignItems="flex-start"
        p="2rem"
      >
        <ButtonParts label={"＜　戻る"} callback={routerBack} />
        <ChakraImage
          src={blog.cover.url}
          alt="cover image"
          width="100%"
          height="30vh"
          objectFit="cover"
        />
        <Heading fontSize="1.414rem">{blog.title}</Heading>
        <Flex width="100%">
          <div
            dangerouslySetInnerHTML={{
              __html: `${blog.body}`,
            }}
          />
        </Flex>
      </VStack>
    </Container>
  );
};

export const getStaticPaths = async () => {
  const apiKey = process.env.API_KEY;
  const endpoint = process.env.ENDPOINT;

  if (apiKey === undefined) {
    throw new Error("API KEY is undefined");
  } else if (endpoint === undefined) {
    throw new Error("ENDPOINT is undefined");
  }

  const key = {
    headers: { "x-api-key": process.env.API_KEY ?? "" },
  };

  const res = await fetch(endpoint, key);
  const blogs = (await res.json()) as IBlogList;
  const paths = blogs.contents.map((blog) => `/blogs/${blog.id}`);

  return { paths, fallback: false };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  const apiKey = process.env.API_KEY;
  const endpoint = process.env.ENDPOINT;

  if (apiKey === undefined) {
    throw new Error("API KEY is undefined");
  } else if (endpoint === undefined) {
    throw new Error("ENDPOINT is undefined");
  }

  const key = {
    headers: { "x-api-key": process.env.API_KEY ?? "" },
  };

  const id = context.params?.id;
  const res = await fetch(`${endpoint}${id}`, key);
  const data = await res.json();

  return { props: { blog: data as IBlog } };
};

export default Blog;
