import http from "./http"

export const fetchColumns = (currentPage, pageSize) =>
  http({
    url: `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: "GET",
  })

export const fetchColumnDetail = (id) =>
  http({
    url: `/columns/${id}`,
    method: "GET",
  })

export const fetchPosts = (columnId, currentPage, pageSize) =>
  http({
    url: `/columns/${columnId}/posts?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: "get",
  })

export const fetchPost = (id) =>
  http({
    url: `/posts/${id}`,
    method: "get",
  })

export const deletePost = (id) =>
  http({
    url: `/posts/${id}`,
    method: "delete",
  })

export const createPost = (data) =>
  http({
    data,
    url: "/posts",
    method: "post",
  })

export const userLogin = (data) =>
  http({
    url: "/user/login",
    data,
    method: "post",
  })

export const fetchCurrentUserInformation = () =>
  http({
    url: "/user/current",
    method: "get",
  })

export const register = (data) =>
  http({
    url: "/users",
    data,
    method: "post",
  })

export const modifyUser = (id) =>
  http({
    url: `user/{id}`,
    method: "patch",
  })
