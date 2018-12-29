({
    /*
     * Initially this Method will be called and will fetch the records from the Salesforce Org 
     * Then we will hold all the records into the attribute of Lightning Component
     */
    doFetchCases : function(component) {
        //debugger;
        var action = component.get('c.getMyCases');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS' && component.isValid()) {
                //debugger;
                //// hold all the records into an attribute named "caseData"
                component.set('v.data', response.getReturnValue());              
                //Call refreshDisplay
                this.refreshDisplay(component);
                component.set('v.isLoading',false);
            } else {
                //debugger;
                console.log('ERROR');
            }
        });
        $A.enqueueAction(action);
    },
    /*
     * Method will be called when use clicks on next button and performs the 
     * calculation to show the next set of records
     */
    next : function(component, event){
         debugger;
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        console.log('end -->'+end);
        console.log('start -->'+start);
        console.log('pageSize -->'+pageSize);
        console.log('sObjectList -->'+sObjectList.length);
        var Paginationlist = [];
        var counter = 0;
        var maxCounter = Number(end)+Number(pageSize)+1;
        for(var i = end + 1; i < maxCounter; i ++){
            if(sObjectList.length > i){
                Paginationlist.push(sObjectList[i]);
            }
            counter ++ ;
        }
         debugger;
        start = start + counter;
        end = end + counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
        component.set("v.currentPage", component.get("v.currentPage") + 1);
    },
    /*
     * Method will be called when use clicks on previous button and performs the 
     * calculation to show the previous set of records
     */
    previous : function(component, event){
        var sObjectList = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i = start-pageSize; i < start ; i ++){
            if(i > -1){
                Paginationlist.push(sObjectList[i]);
                counter ++;
            }else{
                start ++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage", start);
        component.set("v.endPage", end);
        component.set('v.PaginationList', Paginationlist);
        component.set("v.currentPage", component.get("v.currentPage") - 1);
    },    
    sortData: function (cmp, fieldName, sortDirection) {
        var data = cmp.get("v.data");
        var reverse = sortDirection !== 'asc';
        
        data = Object.assign([],
                             data.sort(this.sortBy(fieldName, reverse ? -1 : 1))
                            );
        cmp.set("v.data", data);
        
        var pageSize = cmp.get("v.pageSize");
        
        // get size of all the records and then hold into an attribute "totalRecords"
        cmp.set("v.totalRecords",data.length);
        // set start as 0
        cmp.set("v.startPage", 0);                
        cmp.set("v.endPage", pageSize-1);
        var PaginationList = [];
        for(var i=0; i< pageSize; i++){
            if(data.length> i)
                PaginationList.push(data[i]);    
        }
        cmp.set('v.PaginationList', PaginationList);
        cmp.set("v.currentPage", 1);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer
        ? function(x) { return primer(x[field]) }
        : function(x) { return x[field] };
        
        return function (a, b) {
            var A = key(a);
            var B = key(b);
            return reverse * ((A > B) - (B > A));
        };
    },
    refreshDisplay : function(component) {
        var pageSize = component.get("v.pageSize");
        var totalLength = component.get("v.data");
        console.log('pageSize --->'+pageSize);
        console.log('totalLength --->'+totalLength.length);
        // get size of all the records and then hold into an attribute "totalRecords"
        component.set("v.totalRecords", totalLength.length);
        // set start as 0
        component.set("v.startPage", 0);                
        component.set("v.endPage", pageSize-1);
        console.log('startPage---->'+component.get("v.startPage"));
        console.log('endPage---->'+component.get("v.endPage"));
        var PaginationList = [];
        for(var i=0; i< pageSize; i++){
            if(component.get("v.data").length> i)
                PaginationList.push(totalLength[i]);    
        }
        component.set('v.PaginationList', PaginationList);
        //use Math.ceil() to Round a number upward to its nearest integer
        component.set("v.totalPagesCount", Math.ceil(totalLength.length / pageSize));
        component.set("v.currentPage", 1);
    }
})