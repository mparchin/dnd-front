import { useTheme } from "@mui/material";

export default function () {
  const theme = useTheme();
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth={1.5}
      className=""
      viewBox="0 0 1000 1000"
      style={{
        color:
          theme.palette.mode == "dark"
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M542,680.3c-4.8,9.6-9.8,19.2-15.6,28.3c-18.9,29.6-41.3,55.9-71.7,74.5c-13.3,8.2-27.5,14.5-42.5,19
	c-21.9,6.6-44.2,8.9-67,7c-19.6-1.7-38.5-6.5-56.2-14.9c-22.1-10.5-41.6-24.6-56.9-44.1c-2.2-2.8-4.3-5.8-6.5-8.7
	c-0.4-0.6-0.8-1.5-1.7-1.2c-1,0.3-0.5,1.3-0.5,1.9c0.5,8,1.1,16,1.6,23.9c0,0.4,0.1,0.7,0.1,1.8c-7.6-8.4-14.8-16.2-20.4-25.3
	c-14.5-23.1-22.9-48.4-26.9-75.3c-2.7-18.1-3.4-36.3-1.4-54.5c2-18.4,6.7-36,13.9-53c0.4-1,1.8-2.1,0.3-3.1
	c-1.2-0.8-1.8,0.6-2.6,1.1c-8.8,6.1-17.6,12.2-27.1,18.8c2.1-6.4,4.6-11.9,7.1-17.4c11.5-25.9,27.5-48.7,45.7-70.2
	c5.7-6.7,11.7-13,17.7-19.4c1.7-1.8,2.5-1.7,3.8,0.3c2.9,4.3,2.5,8.9,1.8,13.6c-2,12.7-4.8,25.3-6.4,38.1c-0.5,4.2-0.6,8.5-0.9,13.5
	c12.2-12.2,24.9-22.9,38.8-32.1c13.8-9.2,27.7-18.1,44.3-24.4c-8.3,14.5-13.5,28.9-14.1,45.2c4.8-2.2,8.7-5.2,12.9-7.6
	c7.4-4.2,14.5-9,23.2-10.4c7.3-1.2,14.4-0.4,21.4,1.9c3,1,0.7,2,0,2.7c-9,9.4-17.5,19.2-24.9,30c-14,20.6-23.1,43.1-25.6,68.1
	c-2.2,21.8,1,42.5,12.3,61.6c11.6,19.7,28.3,32.6,51,36.6c13.2,2.4,26,0.8,38.5-4.3c28.9-11.7,49.8-32.7,67.3-57.6
	c3.4-4.9,6.6-10,9.6-15.1c1.1-1.9,2-2,3.6-0.7c7,5.8,14,11.6,20.9,17.4c10.5,8.7,20.9,17.5,31.3,26.3
	C543.7,675.5,543.9,676.5,542,680.3z M749.6,610.6c-6.6-1.1-13.2-1.4-20.3-1.3c1.1,1.8,2.4,2.4,3.7,3.1c4.4,2.2,8.6,4.8,12.4,7.8
	c21.3,16.9,20.8,48.3-1.2,63.7c-14.7,10.2-31.2,13.7-48.9,12.2c-1.9-0.2-4,0.1-5.9-0.9c32.1-30.5,12.7-83.6-9.7-92.1
	c0.3,1.7,0.5,3.2,0.8,4.7c4.1,21.1-14.2,42.2-37.8,37.7c-8.4-1.6-15-6.3-21.4-11.5c-24.7-20.4-49.3-40.8-74-61.1
	c-7-5.8-15-9.6-24-11.1c-6.9-1.1-13.8-0.7-20.7-1.5c-6.4-0.7-10.6-3.9-12.5-10.1c-1.4-4.6-2.1-9.3-3.1-14
	c-2.2-10.4-8.1-16.8-18.9-18.4c-5.6-0.8-11.2-1.1-16.8-1.7c-9.1-1.1-17.2-4-22.9-11.7c-2.8-3.8-4.5-8.2-6.3-12.9
	c-0.5,1.1-0.8,1.7-1,2.4c-3.5,12.1-1.2,22.8,7.9,31.7c6.1,6,13.3,10.7,19.8,16.3c6.7,5.8,11.4,12.9,11.3,22
	c-0.1,17.7,6.6,32.5,19.4,44.3c15.2,14.2,32.1,26.4,47.7,40.1c7.2,6.3,14.9,12.1,22.1,18.4c10.1,8.9,15.8,20.1,16.1,33.9
	c0.3,10.9,0,21.8-0.6,32.6c-1.5,23.6,5.7,43.7,24,59.2c6.4,5.4,13.6,9.3,21.8,12c-0.1-1.8-1-2.9-1.5-4.1
	c-6.1-13.1-9.8-26.6-7.9-41.2c1-7.6,3.8-14.4,9.9-19.4c1.6-1.3,2.6-1.6,2.9,1.1c0.9,8.5,3.2,16.7,6.5,24.6
	c6.4,15.3,15.9,28.3,29.2,38.4c16.1,12.2,34.6,16.8,54.2,17.2c28,0.6,52.6-9,74.4-26.1c3.1-2.4,5.7-5.5,8.3-8.9
	c-6.4-0.1-12.4,0.5-18.5,0.4c-12-0.3-23.5-2.1-34.5-6.8c-4.2-1.8-8.1-4.2-11.2-8.4c23.8,1.8,41.6-1.4,60.3-12
	c25.3-14.3,40.6-35.7,42.3-65.1c1.3-22.8-7.5-42.1-23.3-58.2C787,621.2,769.3,613.8,749.6,610.6z M189.1,452.8
	c7-5.3,13.6-10.5,21-14.8c13.7-7.8,27.5-15.5,41.2-23.3c3.2-1.8,6.3-4,9-6.6c4.9-4.7,5.3-9.4,1.2-15.1c-5.2-7.2-11.6-13.4-18-19.5
	c-2.7-2.7-5.1-5.8-9.4-8.1c16.8-1.7,32.5,0.2,48.6,3c-2.7-6.2-5.2-11.8-6.5-17.9c-2.1-9.1-2.1-18.2,0.1-27.3c0.2-0.7,0-1.7,1-1.8
	c0.7-0.1,1,0.6,1.3,1.2c8.7,16.7,22.8,27.8,38.5,37.4c13.4,8.3,27.5,15.5,40.6,24.3c7.6,5.2,14.5,11.2,20.3,18.4
	c0.2,0.2,0.5,0.3,1.1,0.6c-3.3-9.4-8.8-17.1-15.4-24c-4.2-4.4-8.8-8.4-13.9-11.7c-4-2.5-5.6-6.1-6.5-10.4
	c-4.9-23.6-2.6-46.4,6.9-68.6c0.8-1.8,1.4-4.7,3.4-4.5c1.5,0.1,0.6,3.1,0.8,4.8c1.7,19,9.8,35.1,21.7,49.6
	c8.4,10.2,17.8,19.6,27.8,28.3c19,16.5,37.2,33.9,53.5,53.1c0.5,0.5,0.8,1.2,1.2,1.8c0.2-0.2,0.5-0.4,0.7-0.6
	c-2.2-4.9-4.9-9.6-7.8-14.1c-8.4-12.9-19.2-23.6-30.5-34c-9.4-8.7-18.9-17.3-28.2-26c-4.6-4.3-7.1-10-7.7-16.1
	c-1.2-13.5,0.3-26.6,6.1-39c0.3-0.6,0.5-1.2,1.2-1.4c1.2,0.5,0.8,1.6,0.8,2.5c1,12.3,4.6,23.8,11,34.4c7.7,12.7,17.5,23.6,28.3,33.7
	c12.8,12,26.3,23.5,37.8,36.9c9.9,11.5,20.2,22.9,25.6,37.6c3.3,9,4.5,18.2,3.1,27.7c-0.3,2.1,0,3.2,2.1,4.2
	c7.5,3.3,11.7,9,11.9,17.7c9.1-2.9,14.8-9.4,20-16.7c7.3,17.4-9.4,63.6-34.1,73.4c0.2-4.7,1.5-9.3,0.7-14
	c-1.7-9.5-6.9-15.9-15.9-19.1c-10.1-3.6-20.5-4.9-31.2-4.1c-4.2,0.3-4.2,0.2-2.7-3.6c2-5,4.7-9.8,5.7-15.2c1-5.9-1.3-9.7-7.2-10.7
	c-13.3-2.2-26.6-2.5-40.1-0.2c-9.4,1.6-18.9,3-28.4,4.4c-1.3,0.2-2.5,0.4-4.1,1.6c4.1,0.6,7.7,1.1,11.2,1.6c5.3,0.7,10.6,1.4,15.9,2
	c1.9,0.2,2.3,0.8,1.6,2.7c-2,5-3.9,10.1-5.8,15.2c-1.6,4.4-2.2,8.9-2.2,13.5c0.1,6,4.4,8.8,10,6.7c1.8-0.7,4.2-1.6,5.5-0.8
	c1.5,1,0,3.3-0.3,5c-0.8,5-2,10-1.9,15.2c0.2,7,3.1,10.1,10.2,10.3c2.5,0.1,5.1-0.3,7.6-0.5c1.7-0.2,2,0.4,1.5,1.9
	c-1.2,3.4-3.3,6.2-5.8,8.8c-13.5,13.8-30.1,20.7-49.1,22.7c0-1.6,1.1-2.3,1.9-3.1c5-5.7,10.1-11.3,15-17c0.5-0.6,1.8-1.1,1.1-2.3
	c-0.6-1-1.7-0.7-2.6-0.6c-6.1,0.8-12.2,1.7-18.4,2.4c-1,0.1-2.5,1-3.1-0.5c-0.5-1.2,0.9-1.8,1.6-2.5c6.2-6.1,10.8-13.2,12.6-21.8
	c4.6-21.5-6-38.2-27.4-43c-12.6-2.9-24.8-1.7-36.5,3.9c-0.9,0.4-1.7,0.8-2.6,1.1c-0.3,0.1-0.6,0-1.4-0.1c3.9-9.8,9.6-18,16.7-25.4
	c7.2-7.4,15.6-13.1,25.2-18.3c-10.7-2.8-20.6-5.4-31.2-8.1c17-11.1,35.6-15.7,54.6-19.1c-15.6-1.4-31-0.7-46.1,3.9
	c-15.1,4.6-28.4,12.4-40.4,23.5c9.7,1.8,18.7,3.4,27.8,5.1c-14.1,5.3-27.6,11.7-40.5,19.3c-12.9,7.6-24.9,16.4-36.8,26.5
	c1.3-6.2,2.6-11.7,3.6-17.2c1.2-6.2,1.5-12.5,0.2-18.8c-2.3-10.9-10-17.9-21.1-20c-9.1-1.7-18.1-0.6-27.1-0.2
	C196.1,452.9,192.9,452.8,189.1,452.8z M427.6,426.9c1.7,17.8,13.9,31.3,29.8,30.8C451.5,443.4,442,432.9,427.6,426.9z M252.9,342
	c3.5,6.3,7.9,11.8,14.6,16.4c-5.4-24.1-1.9-46.3,8.6-68.6c3.3,10.7,7.3,20.2,12.8,28.8c10,15.7,23.4,27.9,39.8,36.7
	c0.9,0.5,1.9,1.6,2.8,0.9c0.9-0.7,0.3-2,0.2-3c-1.8-14.7-1.4-29.4,1.3-44c1-5.8,2.7-11.4,1.6-17.6c-3.5-19,0.7-36.4,13.1-51.6
	c16.8-20.6,50.4-22.7,68.9-4c12.5,12.6,17.1,28.5,16.8,45.9c-0.3,16.9-4.7,32.6-13.8,47c-0.8,1.3-0.9,2.1,0.1,3.4
	c4,5,8,10,12.4,14.6c13.2,14,28,26.2,41.7,39.7c1.7,1.7,2.4,1.5,3.8-0.3c13.1-16.9,22.5-35.6,29.7-55.6c7.5-20.9,10.6-42.3,7.6-64.5
	c-2.5-17.7-8.3-34.3-17.6-49.6c-12.2-20-28.9-35.1-50.4-44.7c-14.9-6.6-30.6-10.1-47-10.8c-14-0.6-27.7,0.6-41.2,4.2
	c-17,4.6-31.9,12.9-44.5,25.4c-0.7,0.7-1.4,2-2.6,1.2c-0.9-0.6-0.2-1.8,0-2.7c1.1-6.4,2.3-12.8,3.5-19.8
	c-28.5,21.1-45.9,48.9-55.5,82.1c-1.5-8-3-15.9-4.5-24.2c-3.9,4-7.8,11.1-10,17.8c-5,14.7-6.4,29.8-5.6,45.1
	C240.5,308.3,244,325.9,252.9,342z M837.4,440.7c-4.4-3.4-8.7-6.9-13.2-10.2c-18.9-14.2-39.8-23.7-63.5-26.5
	c-14.7-1.7-29.1-0.2-43.3,3.9c-7.3,2.1-14.5,4.4-21.7,6.4c-2.6,0.7-5.4,0.6-7.2-1.9c-1.5-2.2-0.6-5.9,1.8-8.1c2.6-2.4,5.3-4.6,8-6.8
	c3.4-2.7,7-5.4,10.6-8.1c-2.1-1-4-0.3-5.8,0.1c-15,3.2-27.6,11.1-39.5,20.3c-8.7,6.7-17.4,13.4-25.9,20.3c-2.9,2.3-6.1,2.1-9.4,2.1
	c-1.2,0-1.3-0.8-1.3-1.7c-0.1-3.1,0-6.1,1.7-9c2.4-4,4.6-8.1,7-12.4c-27.1,13.3-69.7,67.3-71.7,90.8c9.1-9.7,18.9-18.5,29.6-26.1
	c24.6-17.6,51.4-30.6,81.3-36.3c8.2-1.6,16.5-1.9,24.7-1.3c-22.5,3.5-43.4,10.9-63.1,21.9c-31.1,17.3-57.6,40.2-80.8,67.1
	c-6.9,8-13.5,16.3-19.8,24.7c-2.4,3.2-2.4,3.2,1.2,4.8c5.1,2.3,9.9,5,14.3,8.4c8.6,6.8,17,13.9,25.6,20.7c3.4,2.7,3.5,2.6,5.3-1.3
	c11.2-24.8,24.3-48.6,40.2-70.8c7.6-10.6,15.5-20.9,24.6-30.2c8.7-8.9,19.2-15.3,31.1-19c21-6.5,41.7-7.2,61.3,5
	c3.9,2.4,7.6,2,11-0.6c7.8-5.9,17-8.7,26.1-11.6c19.6-6.4,39.6-9.1,60.2-7.3c0.8,0.1,1.7,0.5,2.3-0.5
	C839.6,446.2,838.7,441.7,837.4,440.7z M647,839.5c0.1,0,0.1,0,0.2,0c0-7,0-14.1,0-21.1c-0.1,0-0.1,0-0.2,0
	C647,825.5,647,832.5,647,839.5z"
      />
    </svg>
  );
}
