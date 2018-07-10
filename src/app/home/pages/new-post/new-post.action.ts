
import { createPost } from './graphql/create-post.mutation';
import { PostInput } from './interfaces';

export class CreatePost {
  static mutation = createPost;
  variables: any;
  constructor(postInput: PostInput) {
    this.variables = { postInput };
  }
}

// This is a regular action, does nothing
// but might trigger other actions that do
export class PostCreationSuccess {
  static type = '[New Post] Finished! :)';
}

export class PostCreationFailure {
  static type = '[New Post] Failure :(';
}
