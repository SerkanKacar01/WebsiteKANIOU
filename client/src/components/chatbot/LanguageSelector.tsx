import { ChevronDown, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, type SupportedLanguage } from "@/hooks/useLanguage";

export function LanguageSelector() {
  const { language, changeLanguage, languageOptions, t } = useLanguage();

  const currentLanguage = languageOptions.find(lang => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 px-2 text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
          aria-label={t("chatbot.languageSelector")}
        >
          <Globe className="h-3 w-3 mr-1" />
          <span className="text-sm mr-1">{currentLanguage?.flag}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {languageOptions.map((option) => (
          <DropdownMenuItem
            key={option.code}
            onClick={() => changeLanguage(option.code)}
            className={`flex items-center gap-2 cursor-pointer ${
              language === option.code ? "bg-accent" : ""
            }`}
          >
            <span className="text-base">{option.flag}</span>
            <span className="text-sm font-medium">{option.name}</span>
            {language === option.code && (
              <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}