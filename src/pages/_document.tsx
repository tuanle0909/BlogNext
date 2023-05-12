import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Muli:ital,wght@0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet"/>
        <link href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet"/>
        <link href="assets/libs/bootstrap4/bootstrap-tcl.css" rel="stylesheet"/>
        <link href="assets/css/main.css" rel="stylesheet"/>
        
        <link href="assets/css/header.css" rel="stylesheet"/>
        <link href="assets/css/footer.css" rel="stylesheet"/>
        <link href="assets/css/main-title.css" rel="stylesheet"/>
        <link href="assets/css/latest-news-list.css" rel="stylesheet"/>
        <link href="assets/css/article-item.css" rel="stylesheet"/>
        <link href="assets/css/popular-news-list.css" rel="stylesheet"/>
        <link href="assets/css/button.css" rel="stylesheet"/>
        <link href="assets/css/post-detail.css" rel="stylesheet"/>
        <link href="assets/css/login.css" rel="stylesheet"/>
        <link href="assets/css/comments.css" rel="stylesheet"/>
        <link href="assets/css/post-author.css" rel="stylesheet"/>
        <link href="assets/css/related-posts.css" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
