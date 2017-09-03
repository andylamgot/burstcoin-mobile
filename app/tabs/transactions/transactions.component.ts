import { Component, OnInit } from "@angular/core";
import { isAndroid } from "platform";
import { SelectedIndexChangedEventData, TabView, TabViewItem } from "tns-core-modules/ui/tab-view";
import { Label } from "ui/label";
import { Border } from "ui/border";

import { Transaction, Wallet } from "../../lib/model";

import { DatabaseService, MarketService, NotificationService, WalletService } from "../../lib/services";

import { registerElement } from "nativescript-angular/element-registry";
registerElement("TransactionRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);


@Component({
    selector: "transactions",
    moduleId: module.id,
    templateUrl: "./transactions.component.html",
    styleUrls: ["./transactions.component.css"]
})
export class TransactionsComponent implements OnInit {

    transactions: Transaction[];
    ownId: string;

    constructor(
        private databaseService: DatabaseService,
        private marketService: MarketService,
        private notificationService: NotificationService,
        private walletService: WalletService
    ) {
        this.ownId = "";
        this.transactions = [];
    }

    ngOnInit(): void {
        this.walletService.currentWallet.subscribe((wallet: Wallet) => {
            if (wallet != undefined) {
                this.transactions = wallet.transactions;
                this.ownId = this.walletService.currentWallet.value.id;
            }
        });
    }

    public convertFiat() {

    }

    public onTapItem(e) {

    }

    public refresh(args) {
        var pullRefresh = args.object;
        let wallet = this.walletService.currentWallet.value;
        this.walletService.synchronizeWallet(wallet)
            .then(wallet => {
                this.transactions = wallet.transactions;
                pullRefresh.refreshing = false;
            })
    }
}
