import { Header3, UnorderedList } from "@/app/_common/components/typography";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { type Theory } from "@prisma/client";

export const RelatedTheories = ({ theories = [] }: { theories?: Theory[] }) =>
  theories.length > 0 && (
    <div>
      <Header3>Teoría recomendada</Header3>

      <UnorderedList>
        {theories.map((theory) => (
          <li key={theory.id}>
            <Link
              href={`/theories/${theory.id}`}
              className="flex flex-row items-center hover:underline"
              target="_blank"
            >
              {theory.name}
              <ArrowUpRight size={20} />
            </Link>
          </li>
        ))}
      </UnorderedList>
    </div>
  );
