import React, { useState, useEffect } from "react";
import CreateLinks from "./CreateLinks";
import { Card, Input } from "semantic-ui-react";
import { getLinks, addClick } from "../api";

const Home = (props) => {
  console.log(props);
  const [links, setLinks] = useState();
  const [copyLinks, setCopyLinks] = useState();
  const [search, setSearch] = useState("");

  const handleChanges = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value);
    console.log(search);
    searchLinks(event.target.value);
  };
  console.log(search);

  useEffect(() => {
    getLinks()
      .then((response) => {
        console.log(response.allLinks);
        setLinks(response.allLinks);
        setCopyLinks(response.allLinks);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  }, []);

  const searchLinks = (searchTerm) => {
    console.log("search term", searchTerm);
    const filteredLinks = copyLinks.filter((link) => {
      return (
        link.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.tags[0].name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setLinks(filteredLinks);
    console.log("filtered links", filteredLinks);
  };

  const searchTag = (searchTerm) => {
    setSearch(searchTerm);
    console.log("search term2", searchTerm);
    const filteredLinks = copyLinks.filter((link) => {
      return link.tags[0].name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setLinks(filteredLinks);
    console.log("filtered links2", filteredLinks);
  };

  const filterPopular = () => {
    const filteredLinks = copyLinks.sort((a, b) => {
      return b.clickCount - a.clickCount;
    });
    setLinks([...filteredLinks]);
  };

  const addCount = (id) => {
    console.log(id);
    addClick(id)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      });
  };
  console.log("links", links);

  return (
    <>
      <div className="home-top">
        <h1>Bookmark Ninja</h1>
      </div>
      <div className="text-top">
        <p>
          Create your bookmark by entering a link, a short comment and #tag in
          the appropriate fields.
        </p>
        <p>
          Search and sort links by popularity (most views). Click on tags to
          search for them.
        </p>
      </div>

      <CreateLinks />
      <div className="flexbox-search">
        <div className="search-bar">
          <Input placeholder="Search" value={search} onChange={handleChanges} />
        </div>
        <div>
          <button className="most-popular" onClick={filterPopular}>
            Most Popular
          </button>
        </div>
      </div>
      <div className="home">
        <div className="flexbox-column">
          <div className="link-listings">
            {links
              ? links.map((link) => {
                  const date = new Date(link.dateShared);
                  return (
                    <div key={link.id} className="link-card">
                      <Card>
                        <Card.Content style={{ border: "none" }}>
                          <Card.Header>
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => addCount(link.id)}
                            >
                              {link.url}
                            </a>
                          </Card.Header>
                          <div>
                            <b>Date:</b>&nbsp;
                            {date.toDateString()}
                          </div>
                          <div>
                            <b>Views:</b> &nbsp;
                            {link.clickCount}
                          </div>
                          <div className="flexbox">
                            <b>Tags:</b> &nbsp;
                            {link.tags.map((tag) => {
                              return (
                                <span
                                  className="tag"
                                  onClick={() => searchTag(tag.name)}
                                >
                                  {tag.name}
                                </span>
                              );
                            })}
                          </div>
                        </Card.Content>
                        <Card.Description>
                          <b>Comment:</b> {link.comment}
                        </Card.Description>
                      </Card>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
