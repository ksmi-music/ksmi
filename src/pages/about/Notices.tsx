import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Link } from "react-router-dom";
import { useNoticesContent } from "@/hooks/useNoticesContent";
import { ExternalLink } from "lucide-react";

const PAGE_SIZE = 10;

const Notices = () => {
  const [page, setPage] = useState(1);
  const { notices } = useNoticesContent();
  const totalPages = Math.max(1, Math.ceil(notices.length / PAGE_SIZE));
  const paged = notices.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <Layout>
      <PageHero title="공지사항" subtitle="Notices" />

      <ScrollReveal className="mx-auto max-w-6xl px-4 py-16">
        <Accordion type="single" collapsible className="space-y-3">
          {paged.map((n) => (
            <AccordionItem
              key={n.id}
              value={`notice-${n.id}`}
              className="rounded-lg border bg-card px-5 overflow-hidden"
            >
              <AccordionTrigger className="py-4 hover:no-underline gap-4 min-w-0">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Badge
                    variant="secondary"
                    className="text-[11px] shrink-0 min-w-[48px] justify-center"
                  >
                    {n.tag}
                  </Badge>
                  <span className="flex-1 text-sm text-left truncate">{n.title}</span>
                  {n.href?.trim() ? (
                    <span
                      className="shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {n.href.startsWith("/") ? (
                        <Link
                          to={n.href}
                          className="text-xs text-muted-foreground hover:text-accent transition-colors"
                        >
                          링크
                        </Link>
                      ) : (
                        <a
                          href={n.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-muted-foreground hover:text-accent transition-colors inline-flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          링크
                        </a>
                      )}
                    </span>
                  ) : null}
                  <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                    {n.date}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5 break-words">
                {n.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {totalPages > 1 && (
          <div className="mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className={page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      onClick={() => setPage(p)}
                      isActive={p === page}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    className={page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </ScrollReveal>
    </Layout>
  );
};

export default Notices;
