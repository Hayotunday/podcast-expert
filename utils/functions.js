import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const server = process.env.NEXT_PUBLIC_SERVER_URL?.substring(0, process.env.NEXT_PUBLIC_SERVER_URL?.lastIndexOf("/"))
const serverUrl = isProduction
  ? server : "http://localhost:3000";

export const uploadImage = async (imagePath) => {
  console.log("server: ", server)
  console.log("server-url: ", serverUrl)

  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({ path: imagePath }),
    });

    return response.json();
  } catch (error) {
    throw error;
  }
};

export const setToken = (token) => {
  window.localStorage.setItem("PodcastToken", token)
  console.log(token)
}

export const handleUnFavorite = async (id, url) => {
  const token =
    localStorage.getItem("podcastToken") === undefined ||
      localStorage.getItem("podcastToken") === null
      ? ""
      : localStorage.getItem("podcastToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios
    .patch(url, { data: id }, config)
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
};

export const handleFavorite = async (id, url) => {
  const token =
    localStorage.getItem("podcastToken") === undefined ||
      localStorage.getItem("podcastToken") === null
      ? ""
      : localStorage.getItem("podcastToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  await axios
    .patch(url, { data: id }, config)
    .then(() => {
      return;
    })
    .catch((err) => console.log(err));
};