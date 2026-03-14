import { useState } from "react";
import { SubscriptionData, ACQUISITION_CHANNELS } from "../../domain/subscription.schema";
import { FormContent } from "../../domain/homepage-content.model";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SubscriptionFormProps {
    onSubmit: (e: React.FormEvent) => void;
    isLoading: boolean;
    errors: Partial<Record<keyof SubscriptionData, string>>;
    formContent: FormContent;
}

export function SubscriptionForm({ onSubmit, isLoading, errors, formContent }: SubscriptionFormProps) {
    const [selectedChannel, setSelectedChannel] = useState<string>("");

    return (
        <div className="mt-8">
            <div className="mb-6">
                <h3 className="text-2xl font-cinzel font-bold text-cream mb-2">
                    {formContent.title}
                </h3>
                {formContent.subtitle && (
                    <p className="text-cream/70 italic">
                        {formContent.subtitle}
                    </p>
                )}
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-3">
                    <div>
                        <Input
                            name="firstName"
                            type="text"
                            placeholder={formContent.firstNamePlaceholder}
                            required
                            className={`h-12 rounded-full bg-cream text-deep-violet border-2 ${errors.firstName ? "border-destructive" : "border-transparent"
                                } focus-visible:border-gold focus-visible:ring-gold/30 placeholder:text-deep-violet/50`}
                        />
                        {errors.firstName && <p className="text-destructive text-sm mt-1 ml-4">{errors.firstName}</p>}
                    </div>
                    <div>
                        <Input
                            name="email"
                            type="email"
                            placeholder={formContent.emailPlaceholder}
                            required
                            className={`h-12 rounded-full bg-cream text-deep-violet border-2 ${errors.email ? "border-destructive" : "border-transparent"
                                } focus-visible:border-gold focus-visible:ring-gold/30 placeholder:text-deep-violet/50`}
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1 ml-4">{errors.email}</p>}
                    </div>

                    {/* Acquisition Channel */}
                    <div>
                        <label className="block text-cream/80 text-sm mb-2 ml-2">
                            {formContent.acquisitionChannelLabel}
                        </label>
                        <select
                            name="acquisitionChannel"
                            required
                            value={selectedChannel}
                            onChange={(e) => setSelectedChannel(e.target.value)}
                            className={`w-full px-5 py-3 rounded-full bg-cream text-deep-violet border-2 ${errors.acquisitionChannel ? "border-destructive" : "border-transparent"
                                } focus:border-gold focus:outline-none appearance-none cursor-pointer`}
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231d1852'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "right 1rem center",
                                backgroundSize: "1.5rem",
                            }}
                        >
                            <option value="" disabled>Sélectionne une option...</option>
                            {ACQUISITION_CHANNELS.map((channel) => (
                                <option key={channel} value={channel}>{channel}</option>
                            ))}
                        </select>
                        {errors.acquisitionChannel && <p className="text-destructive text-sm mt-1 ml-4">{errors.acquisitionChannel}</p>}
                    </div>

                    {/* Autre - Free text input */}
                    {selectedChannel === "Autre" && (
                        <div>
                            <Input
                                name="acquisitionChannelOther"
                                type="text"
                                placeholder="Précise comment tu nous as trouvés..."
                                className={`h-12 rounded-full bg-cream text-deep-violet border-2 ${errors.acquisitionChannelOther ? "border-destructive" : "border-transparent"
                                    } focus-visible:border-gold focus-visible:ring-gold/30 placeholder:text-deep-violet/50`}
                            />
                            {errors.acquisitionChannelOther && <p className="text-destructive text-sm mt-1 ml-4">{errors.acquisitionChannelOther}</p>}
                        </div>
                    )}
                </div>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gold text-deep-violet font-cinzel font-bold text-sm sm:text-lg py-3 px-4 sm:px-6 h-auto whitespace-normal leading-snug rounded-xl sm:rounded-full hover:bg-gold/80 transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                >
                    {isLoading ? formContent.submitButtonLoading : formContent.submitButtonDefault}
                </Button>

                <p className="text-xs text-cream/60 text-center italic">
                    {formContent.disclaimer}
                </p>
            </form>
        </div>
    );
}
