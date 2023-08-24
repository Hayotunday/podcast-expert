import axios from "axios";

const session = {
  data: {
    expires:
      "2023-07-29T14:34:15.358Z",
    user: {
      email: "idowudanielayotunde@gmail.com",
      id: "649d815dc15c8b7a365d3b0b",
      image: "https://lh3.googleusercontent.com/a/AAcHTtfEoUfFv5vJoOSS3RNWC4m91kWn0m4dJAibgidtG0z8NmM=s96-c",
      name: "Daniel Ayotunde Idowu"
    }
  },
  status: "authenticated"

}
export const setToken = (token) => {
  window.localStorage.setItem("PodcastToken", token)
  console.log(token)
}

export const handleUnFavorite = async (id,url) => {
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