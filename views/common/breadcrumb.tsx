import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import * as React from "react";

interface Ibreadcrumb {
  isChild?: boolean;
  child?: { id: string | undefined; name: string | undefined };
}

export const BasicBreadcrumbs: React.FC<Ibreadcrumb> = ({
  isChild = false,
  child,
}) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link underline="hover" color="inherit" href="/coins">
          Home
        </Link>
        {isChild && (
          <Link underline="hover" color="inherit" href={`/coins/${child?.id}`}>
            {child?.name}
          </Link>
        )}
      </Breadcrumbs>
    </div>
  );
};
