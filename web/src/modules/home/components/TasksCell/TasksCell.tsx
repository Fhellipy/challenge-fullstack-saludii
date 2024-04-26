
export const QUERY = gql`
  query TasksQuery($status: TaskStatus!) {
    tasks(status: $status) {
      id
      title
      description
      status
      createdAt
      updatedAt
    }
  }
`;

export const beforeQuery = (props) => ({
  variables: { status: props.status },
});

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Tasks not found</div>;

export const Failure = ({ error }) => (
  <div className="rw-cell-error">{error.message}</div>
);

export const Success = ({ tasks }) => {
  return (
    <div>
      <h2>TaskList</h2>
      <ul>
        {tasks?.map((task) => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>{task.status}</p>
            <p>{task.createdAt}</p>
            <p>{task.updatedAt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

