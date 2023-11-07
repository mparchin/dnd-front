import {
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListSubheader,
  PaletteColor,
  Skeleton,
} from "@mui/material";

export default function (primaryColor: PaletteColor) {
  return (
    <>
      <CircularProgress
        size={80}
        className="absolute z-20 left-[calc(50%-40px)] top-[calc(50%-40px)]"
        sx={{
          color: primaryColor.main,
        }}
      />
      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          "& ul": { padding: 0 },
        }}
        className="overflow-auto box-border z-10"
        subheader={<li />}
      >
        {[0, 1, 2].map((sectionId) => (
          <li key={`skeleton-${sectionId}`}>
            <ul>
              <ListSubheader>
                <Skeleton variant="text"></Skeleton>
              </ListSubheader>
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <div key={`item-${sectionId}-${item}`}>
                  <ListItem>
                    {/* <ListItemText primary={`Item ${item}`} /> */}
                    <Skeleton
                      variant="rectangular"
                      className="flex-grow h-20"
                    ></Skeleton>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </ul>
          </li>
        ))}
      </List>
    </>
  );
}
