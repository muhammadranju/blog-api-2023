/**
 * @type {{ ADMIN:"ADMIN", USER:"USER", EDITOR:"EDITOR", MANAGER:"MANAGER" } as const}
 */
const UserRolesEnum = {
  ADMIN: "ADMIN",
  USER: "USER",
  EDITOR: "EDITOR",
  MANAGER: "MANAGER",
};

const AvailableUserRoles = Object.values(UserRolesEnum);

/**
 * @type {{ APPROVED:"APPROVED", PENDING:"PENDING", BLOCK:"BLOCK", DECLINE:"DECLINE" } as const}
 */
const UserStatusEnum = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  BLOCK: "BLOCK",
  DECLINE: "DECLINE",
};

const AvailableUserStatus = Object.values(UserStatusEnum);

/**
 * @type {{ APPROVED:"APPROVED", PENDING:"PENDING", SUSPENDED:"SUSPENDED"} as const}
 */
const UserCommentStatusEnum = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  SUSPENDED: "SUSPENDED",
};

const AvailableCommentStatus = Object.values(UserCommentStatusEnum);

/**
 * @type {{ PENDING:"PENDING", PUBLISHED:"PUBLISHED", DRAFT:"DRAFT" } as const}
 */
const PostStatusEnum = {
  PENDING: "PENDING",
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
};

const AvailablePostStatus = Object.values(PostStatusEnum);

/**
 * @type {{ User:"User", Post:"Post", Comment:"Comment" } as const}
 */
const ModelRefNames = {
  User: "User",
  Post: "Post",
  Comment: "Comment",
};

/**
 * @type {{ verify:true, unverified:false, } as const}
 */
const VerifyStatus = {
  verify: true,
  unverified: false,
};
const DATABASE_NAME = "BLOG-API-2023";
const DATABASE_QUERY = "?retryWrites=true&w=majority";

module.exports = {
  UserRolesEnum,
  AvailableUserRoles,
  UserStatusEnum,
  AvailableUserStatus,
  UserCommentStatusEnum,
  AvailableCommentStatus,
  PostStatusEnum,
  AvailablePostStatus,
  ModelRefNames,
  VerifyStatus,
  DATABASE_NAME,
  DATABASE_QUERY,
};
