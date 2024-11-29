import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Lazy-loaded pages
const HomePage = React.lazy(async () => ({
    default: (await import("../pages/home")).HomePage
}))
const SwapPage = React.lazy(async () => ({
    default: (await import("../pages/swap")).SwapPage
}))
const TransferPage = React.lazy(async () => ({
    default: (await import("../pages/transfer")).TransferPage
}))
const LiquidityPage = React.lazy(async () => ({
    default: (await import("../pages/liquidity")).LiquidityPage
}))
const ExchangePage = React.lazy(async () => ({
  default: (await import("../pages/exchange")).ExchangePage
}))

export const AppRoutesPaths = {
    home: "/",
    swap: "/swap",
    transfer: "/transfer",
    liquidity: "/liquidity",
    exchange: "/exchange"
}

const AppRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center text-white mt-8">Loading...</div>}>
      <Routes>
        <Route path={AppRoutesPaths.home} element={<HomePage />} />
        <Route path={AppRoutesPaths.swap} element={<SwapPage />} />
        <Route path={AppRoutesPaths.transfer} element={<TransferPage />} />
        <Route path={AppRoutesPaths.liquidity} element={<LiquidityPage />} />
        <Route path={AppRoutesPaths.exchange} element={<ExchangePage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
