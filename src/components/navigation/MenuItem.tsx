// import React from "react";

// interface MenuItemProps {
//   selected: boolean;
//   label: string;
//   outlinedIcon?: React.ElementType;
//   icon: React.ElementType;
//   selectedColor: string;
//   onClick: () => void;
// }
// export default function (props: MenuItemProps) {
//   return (
//     <div
//       className="w-20 h-20 flex-shrink-0 flex-grow flex-col flex items-center"
//       onClick={props.onClick}
//     >
//       {props.outlinedIcon && !props.selected ? (
//         <>
//           <div className="flex-grow h-0.5 mb-2"></div>
//           <props.outlinedIcon />
//         </>
//       ) : props.selected ? (
//         <>
//           <div
//             className="w-full h-0.5 mb-2"
//             style={{
//               background: props.selectedColor,
//             }}
//           ></div>
//           <props.icon
//             style={{
//               color: props.selectedColor,
//             }}
//           />
//         </>
//       ) : (
//         <>
//           <div className="flex-grow h-0.5 mb-2"></div>
//           <props.icon />
//         </>
//       )}
//       <div
//         className="grow-[2]"
//         style={{
//           color: props.selectedColor,
//         }}
//       >
//         {props.selected ? props.label : ""}
//       </div>
//     </div>
//   );
// }
