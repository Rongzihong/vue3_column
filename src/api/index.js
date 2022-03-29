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
