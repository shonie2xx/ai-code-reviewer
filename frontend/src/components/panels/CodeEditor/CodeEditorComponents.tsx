import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CODE_SNIPPETS } from '@/lib/utils';

export function CharDisplay({ count }: { count: number }) {
  return (
    <div>
      {count < 30 ? (
        <div className=" bg-red-100 border-red-500 text-red-700 px-2 py-1 rounded border text-xs">
          Min 30 characters required
        </div>
      ) : count > 500 ? (
        <div className="bg-red-100 border-red-500 text-red-700 px-2 py-1 rounded border text-xs">
          {count} characters
        </div>
      ) : (
        <div className="bg-green-100 border-green-500 text-green-700 px-2 py-1 rounded border text-xs">
          {count} characters
        </div>
      )}
    </div>
  );
}

export function LanguageSelector(props: React.ComponentProps<typeof Select>) {
  return (
    <Select {...props}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a language" />
      </SelectTrigger>
      <SelectContent className="bg-black">
        <SelectGroup>
          {Object.keys(CODE_SNIPPETS).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
