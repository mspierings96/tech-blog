async function newFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector(
    'textarea[name="comment-text"]'
  ).value;
  const post_id = document.querySelector('input[name="post-id"]').value;

  const response = await fetch(`/api/comments`, {
    method: "POST",
    body: JSON.stringify({
      comment_text,
      post_id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".new-comment-form")
  .addEventListener("submit", newFormHandler);
