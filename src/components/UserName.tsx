import { User } from "../utils/types.utils";

type Props = {
  user: User;
};

function UserName({ user }: Props) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-text text-sm">
        {user.name} <b>{`(@${user.username})`}</b>
      </p>
    </div>
  );
}

export { UserName };
