({
    doInit: function (component, event, helper) {
        // Set the columns of the Table 
        component.set('v.isLoading',true);
        component.set('v.columns', [
            {label: 'Case Number', fieldName: 'Batch_Data_Load_ID__c', type: 'url', typeAttributes: {label: { fieldName: 'CaseNumber'},target: '_blank'}, sortable : true},
            {label: 'Case Title', fieldName: 'Case_Title__c', type: 'text', sortable : true},
            {label: 'Current Case Status', fieldName: 'Status', type: 'text', sortable : true},
            {label: 'Created Date', fieldName: 'CreatedDate', type: 'text', sortable : true},
            {label: 'Closed Date', fieldName: 'ClosedDate', type: 'text', sortable : true},
        ]);
            helper.doFetchCases(component);
            },           
            next: function (component, event, helper) {
            	helper.next(component, event);
            },
            previous: function (component, event, helper) {
            	helper.previous(component, event);
            },
            updateColumnSorting: function (cmp, event, helper) {
                cmp.set('v.isLoading', true);
                // We use the setTimeout method here to simulate the async
                // process of the sorting data, so that user will see the
                // spinner loading when the data is being sorted.
                setTimeout(function() {
                    var fieldName = event.getParam('fieldName');
                    var sortDirection = event.getParam('sortDirection');
                    cmp.set("v.sortedBy", fieldName);
                    cmp.set("v.sortedDirection", sortDirection);
                    helper.sortData(cmp, fieldName, sortDirection);
                    cmp.set('v.isLoading', false);
                    }, 0);
            },
            handleRowAction : function (cmp, event, helper) {
            	console.log('handleRowAction..................');
            },
            getSelectedName : function (cmp, event, helper) {
            	console.log('getSelectedName.................');
            },
            onRecordsPerPageChange : function (cmp, event, helper) {
             debugger;
            	var recordToDisply = cmp.find("recordSize").get("v.value");
            	console.log('onRecordsPerPageChange.................'+recordToDisply);
            	cmp.set('v.pageSize', recordToDisply);
            console.log('startPage---->'+cmp.get("v.pageSize"));
           
            	helper.refreshDisplay(cmp);
            }
            })