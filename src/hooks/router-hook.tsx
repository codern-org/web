import { useParams } from 'react-router-dom';

export const useWorkspaceParams = () => {
  const { workspaceId, assignmentId, content, settings } = useParams();

  return {
    workspaceId: BigInt(workspaceId || 0),
    assignmentId: BigInt(assignmentId || 0),
    content,
    settings,
  };
};
