import React, { useState } from "react";
import { Input } from "semantic-ui-react";
import { createLinksWithTags } from "../api";

const CreateLinks = () => {
  const [linkData, setLinkData] = useState({
    url: "",
    comment: "",
    name: "",
  });

  const sendLink = (event) => {
    event.preventDefault();
    createLinksWithTags(linkData.url, linkData.comment, linkData.name)
      .then((result) => {
        console.log("created links with tag", result);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  const handleChanges = (event) => {
    setLinkData({ ...linkData, [event.target.name]: event.target.value });
  };
  console.log("linkData", linkData);
  return (
    <div className="form-box create-link form-container flexbox-column">
      <div className="flexbox-space">
        <Input
          className="input"
          name="url"
          value={linkData.url}
          onChange={handleChanges}
          icon="linkify"
          placeholder="Link"
        />
        <Input
          name="comment"
          value={linkData.comment}
          onChange={handleChanges}
          icon="align justify"
          placeholder="Comment"
        />
        <Input
          name="name"
          value={linkData.name}
          onChange={handleChanges}
          icon="tag"
          placeholder="#Tag"
        />
      </div>
      <button
        className="ui button"
        onClick={sendLink}
        disabled={linkData.url.length < 1}
      >
        {" "}
        Create
      </button>
    </div>
  );
};

export default CreateLinks;
