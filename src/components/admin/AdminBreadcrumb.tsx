import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ADMIN_SECTIONS } from "@/lib/adminConfig";

export function AdminBreadcrumb() {
  const location = useLocation();
  const pathname = location.pathname;

  if (pathname === "/admin") {
    return (
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/admin">Admin</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>대시보드</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  const segments = pathname.replace(/^\/admin\/?/, "").split("/").filter(Boolean);
  const items: { path: string; label: string }[] = [{ path: "/admin", label: "Admin" }];

  let currentPath = "/admin";
  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    const section = ADMIN_SECTIONS.find((s) => s.to === currentPath);
    items.push({
      path: currentPath,
      label: section?.label ?? segments[i],
    });
  }

  return (
    <Breadcrumb className="mb-6">
      <BreadcrumbList>
        {items.map((item, i) => (
          <React.Fragment key={item.path}>
            <BreadcrumbItem>
              {i === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item.path}>{item.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {i < items.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
