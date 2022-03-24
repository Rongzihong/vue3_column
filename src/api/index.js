import http from "./http";

export const fetchColumns = (currentPage, pageSize) =>
  http({
    url: `/columns?currentPage=${currentPage}&pageSize=${pageSize}`,
    method: "get",
  })

