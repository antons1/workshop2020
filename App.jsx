import React, { useEffect, useState } from 'react';

export default () => {
    const [blogPosts, setBlogPosts] = useState([]);

    const getPostsEffect = useEffect(() => {
        fetch("http://workshop-blog.s3-website-eu-west-1.amazonaws.com/blog/1.json").then((res) => res.json()).then(({ posts }) => {
            setBlogPosts([...posts]);
        })
    }, [])

    function getMorePosts() {
        fetch("http://workshop-blog.s3-website-eu-west-1.amazonaws.com/blog/2.json").then((res) => res.json()).then(({ posts }) => {
            setBlogPosts([...blogPosts, ...posts]);
        })
    }
    
    return (
    <div>
        <h1>Hello World!</h1>
        {blogPosts.map(({ title }) => <div>{title}</div>)}
        <button onClick={() => getMorePosts()}>Hent fler</button>
    </div>
    );
}