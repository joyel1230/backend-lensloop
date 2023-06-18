import { Post } from "../models/post";

export const fetchPostsData = async (): Promise<{ name: string }> => {
  return new Promise((resolve,reject) => {
    setTimeout(async () => {
      try {
        throw new Error('newerr')
        resolve({ name: "posts" });
      } catch (error) {
        console.error(error.message);
        reject()
      }
    }, 1000);
  });
};
