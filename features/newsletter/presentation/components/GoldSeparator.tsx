export function GoldSeparator() {
    return (
        <div className="w-full flex items-center justify-center py-8">
            <div className="h-[1px] bg-gold w-full max-w-4xl relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#242456] px-4 text-gold">
                    ◈
                </div>
            </div>
        </div>
    );
}
