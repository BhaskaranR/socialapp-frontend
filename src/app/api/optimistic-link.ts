import { ApolloLink, Observable, Operation, NextLink } from 'apollo-link';

export default class OptimisticLink extends ApolloLink {
  public request(operation: Operation, forward: NextLink) {
    if (!operation.getContext().optimistic) {
      return forward(operation);
    }
    return new Observable(observer => {
      setTimeout(() => observer.next(operation.getContext().optimistic), 0);

      const subscription = forward(operation).subscribe({
        next: observer.next.bind(observer),
        error: observer.error.bind(observer),
        complete: observer.complete.bind(observer),
      });

      return () => {
        subscription.unsubscribe();
      };
    });
  }
}
