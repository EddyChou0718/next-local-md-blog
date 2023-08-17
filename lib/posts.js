import fs from 'fs';
import fsPromises from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDir = path.join(process.cwd(), 'posts');

const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir);
  const allPostsData = fileNames.map((name) => {
    const id = name.replace(/\.md$/, '');

    const fullPath = path.join(postsDir, name);
    const contents = fs.readFileSync(fullPath, 'utf8');

    const result = matter(contents);

    const post = {
      id,
      title: result.data.title,
      date: result.data.date
    };

    return post;
  });

  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1);
}

const getPostData = async (id) => {
  const fullPath = path.join(postsDir, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf-8');

  const result = matter(fileContents);

  const processedContent = await remark().use(html).process(result.content);
  const contentHtml = processedContent.toString();

  const postHtml = {
    id,
    contentHtml,
    title: result.data.title,
    date: result.data.date,
  }

  return postHtml;
}

export {
  getSortedPostsData,
  getPostData
};
