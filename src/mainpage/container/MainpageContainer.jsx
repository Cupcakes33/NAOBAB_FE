// import { useEffect } from "react";
// import Mainpage from "../components/Mainpage";
// import { useDispatch, useSelector } from "react-redux";
// import { getAsyncUser } from "../../redux/module/mainpageSlice";

// const MainpageContainer = () => {
//   const dispatch = useDispatch();

//   const { data, error, loading } = useSelector((state) => state.mainpage);

//   useEffect(() => {
//     dispatch(getAsyncUser(1));
//   }, [dispatch]);

//   return <Mainpage data={data} loading={loading} error={error} />;
// };

// export default MainpageContainer;
