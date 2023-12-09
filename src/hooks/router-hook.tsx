import { useParams } from 'react-router-dom';

export const useWorkspaceParams = () => {
  const { workspaceId, assignmentId, content, settings } = useParams();

  return {
    workspaceId: Number(workspaceId),
    assignmentId: Number(assignmentId),
    content,
    settings,
  };
};
