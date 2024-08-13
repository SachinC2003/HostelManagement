import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../Store/userAtom';
import cssloader from "../assets/cssloader.gif";

const ProtectedRoute = ({ children, roles }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    // Simulate loading or check user state
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Replace with actual loading logic if needed
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!user.role || !roles.includes(user.role)) {
        navigate('/signin');
      }
    }
  }, [isLoading, user, roles, navigate]);

  if (isLoading) {
    return (
      <div className="bg-white overflow-hidden w-screen h-screen flex justify-center items-center ">
        <div>
          <div className="flex justify-center"></div>
          <div className="flex items-center justify-center mt-10">
            <img src={cssloader} alt="Loading..." />
          </div>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
