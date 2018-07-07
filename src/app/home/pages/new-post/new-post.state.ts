import { State, Action, Mutation, Update } from '@loona/angular';
import { CreatePost, PostCreationFailure, PostCreationSuccess } from './new-post.action';
import { mapTo, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { posts } from '@app/graphql/queries/post/posts.query';

@State({
})
export class NewPostState {

    @Action(CreatePost)
   // @Update(posts)
    onCreatePost(_action, action$) {
        return action$.pipe(
            mapTo(new PostCreationSuccess()),
            catchError(() => of(new PostCreationFailure())),
        );
    }
}
