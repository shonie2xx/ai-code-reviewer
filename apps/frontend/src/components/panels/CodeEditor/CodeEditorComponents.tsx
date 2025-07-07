import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

export function DropDown({
  nativeProps,
  items,
  title,
}: {
  nativeProps: React.ComponentProps<typeof Select>;
  items: string[];
  title?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      {title && <p>{title}</p>}
      <div>
        <Select {...nativeProps}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-black">
            <SelectGroup>
              {items.map((item, index) => (
                <SelectItem key={index} value={item}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
