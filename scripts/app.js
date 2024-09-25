
const fetchPosts = async (userId) => {
    const postsList = document.getElementById('posts-list');
    postsList.innerHTML = '';
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
      const posts = await response.json();
  
      if (posts.length === 0) {
        postsList.innerHTML = '<p>No posts found for this user.</p>';
        return;
      }
  
      posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');
  
        postCard.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body.slice(0, 100)}...</p>
          <button onclick="showPost(${post.id})">Read More</button>
        `;
  
        postsList.appendChild(postCard);
      });
    } catch (error) {
      postsList.innerHTML = '<p>Error fetching posts. Please try again later.</p>';
    }
  };
  

  const showPost = async (postId) => {
    const modal = document.getElementById('post-modal');
    const postTitle = document.getElementById('post-title');
    const postBody = document.getElementById('post-body');
  
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const post = await response.json();
  
      postTitle.textContent = post.title;
      postBody.textContent = post.body;
  
      modal.style.display = 'flex';
    } catch (error) {
      alert('Error fetching post details');
    }
  };
  

  document.getElementById('close-modal').onclick = () => {
    document.getElementById('post-modal').style.display = 'none';
  };
  
  document.getElementById('back-button').onclick = () => {
    document.getElementById('post-modal').style.display = 'none';
  };
  
  
  document.getElementById('fetch-posts-btn').onclick = () => {
    const userId = document.getElementById('user-id-input').value;
    if (userId) {
      fetchPosts(userId);
    } else {
      alert('Please enter a valid User ID.');
    }
  };
  