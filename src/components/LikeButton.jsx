import React, { useState } from "react";

function LikeButton() {
  const [like, setLike] = useState(false);
  return (
    <button onClick={() => setLike(!like)}>{like ? "Unlike" : "Like"}</button>
  );
}

export default LikeButton;
