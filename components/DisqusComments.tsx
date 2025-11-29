'use client';

import { useEffect } from 'react';

interface DisqusCommentsProps {
  postId: string;
  postTitle: string;
  postSlug: string;
}

export default function DisqusComments({ postId, postTitle, postSlug }: DisqusCommentsProps) {
  useEffect(() => {
    // Disqus configuration
    const disqus_config = function (this: any) {
      this.page.url = `https://gurusclassesofenglish.com/blog/${postSlug}`;
      this.page.identifier = postId;
      this.page.title = postTitle;
    };

    // Load Disqus script
    const d = document;
    const s = d.createElement('script');
    s.src = 'https://YOUR-DISQUS-SHORTNAME.disqus.com/embed.js'; // Replace with your Disqus shortname
    s.setAttribute('data-timestamp', String(+new Date()));
    (d.head || d.body).appendChild(s);

    // Cleanup
    return () => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread) {
        disqusThread.innerHTML = '';
      }
    };
  }, [postId, postTitle, postSlug]);

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
}
