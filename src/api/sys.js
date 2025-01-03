import request from "../utils/request";
import { getToken } from "../utils/auth";

/**
 * 用户登录
 *
 * @param code 免登授权码
 */
export const loginApi = (code) => {
  return request.post("/auth/login", { code });
};

/**
 * 上传文件
 */
export const uploadApi = (filePath, fileType = "image", formData = {}) => {
  const token = getToken();
  if (!formData["fileName"]) {
    formData["fileName"] = filePath.substring(filePath.lastIndexOf("/") + 1);
  }
  return new Promise((resolve, reject) => {
    dd.uploadFile({
      url: `${request.getBaseUrl()}/file/upload`,
      fileType,
      fileName: "file",
      filePath,
      header: { Authorization: `Bearer ${token}` },
      formData,
      success: (res) => {
        if (res.statusCode !== 200) {
          let message = "发生错误";
          try {
            const data = JSON.parse(res.data);
            message = data.message;
          } catch (err) {
            console.log(err);
          }
          dd.showToast({ type: "fail", content: message });
        }
        resolve(res);
      },
      fail: (err) => {
        console.log("error:", err);
        dd.showToast({
          type: "fail",
          content: "调用失败",
        });
        reject(err);
      },
    });
  });
};

// 查询点子
export const reqIdeaList = (params) => request.get("/idea", params);

// 新增点子
export const reqAddNewIdea = (data) => request.post("/idea", data);

// 点赞点子
export const reqPraiseIdea = (ideaId) => request.post("/idea/like", { ideaId });

// 获取点子评论
export const reqIdeaCommentList = (ideaId) =>
  request.get(`/idea/comment`, { ideaId });

// 评论点子
export const reqCommentIdea = (data) => request.post("/idea/comment", data);

// 得到点子详情
export const reqIdeaDetail = (ideaId) => request.get(`/idea/${ideaId}`);

/**
 * 审批点子
 *
 * @param {object} data { ideaId: 0, approve: 'PASS' | 'Reject', message: '' }
 * @returns
 */
export const reqApproveIdea = (data) => request.post("/idea/approve", data);

// 板块管理回复点子（拒绝）
export const replyApproveIdea = (data) =>
  request.post("/idea/comment/back", data);

// 板块管理采纳点子
export const acceptApproveIdea = (data) =>
  request.post("/idea/approve/accept", data);

// 副主任通过
export const acceptMiddleApproveIdea = (data) =>
  request.post("/idea/approve/accept_confirm", data);

// 获取关于我的信息
export const reqMyIdea = () => request.get("/idea/my");

// 获取关于板块管理员审批list信息
export const reqApproveIdeaList = () => request.get("/idea/my-approve");

// 获取关于副主任审批list信息
export const middleApproveIdeaList = () =>
  request.get("/idea/my-middle-approve");

// 获取关于终审审批list信息
export const finalApproveIdeaList = () => request.get("/idea/my-final-approve");

// 获取点子审批信息
export const reqIdeaApproval = (ideaId) =>
  request.get(`/idea/approve/${ideaId}`);

// 收藏点子
export const reqCollectIdea = (ideaId) =>
  request.post("/idea/collect", { ideaId });

// 获取点子收藏列表
export const reqCollectIdeaList = () => request.get("/idea/collect");

// 获取部门标签列表
export const reqDepartmentList = () => request.get("/idea/catalog");

// 获取当前用户的空间列表
export const reqDingSpace = () => request.get("/ding/spaces");

// 获取钉钉自定义空间id
export const reqDingCustomSpaceId = () => request.get("/ding/custom-space");

// 删除点子
export const reqDeleteIdea = (ideaId) => request.post(`/idea/delete/${ideaId}`);

// 删除点子评论
export const reqDeleteIdeaComment = (commentId) =>
  request.post(`/idea/comment/delete/${commentId}`);
